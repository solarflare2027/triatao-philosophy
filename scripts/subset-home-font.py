"""Offline asset maintenance. Requires fonttools[woff]; no runtime dependency."""
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.pens.recordingPen import RecordingPen

root = Path(__file__).resolve().parent.parent
base = root / 'dist/assets/fonts/gen-ryu-min.woff2'
target = root / 'dist/assets/fonts/gen-ryu-home.woff2'
source = TTFont(base)
cmap = source.getBestCmap()
text = ''.join((root / name).read_text() for name in ['dist/index.html', 'dist/home.js'])
characters = set(map(ord, text)) & cmap.keys()
options = subset.Options()
options.layout_features = ['*']
font = TTFont(base)
font.recalcTimestamp = False
subsetter = subset.Subsetter(options=options)
subsetter.populate(unicodes=characters)
subsetter.subset(font)
font.flavor = 'woff2'
font.save(target)

# Verify that subsetting preserved every selected character and its outline.
result = TTFont(target)
result_cmap = result.getBestCmap()
assert characters <= result_cmap.keys()
old_glyphs, new_glyphs = source.getGlyphSet(), result.getGlyphSet()
for code in characters:
    assert source['hmtx'].metrics[cmap[code]] == result['hmtx'].metrics[result_cmap[code]], f'Changed advance: U+{code:04X}'
    before, after = RecordingPen(), RecordingPen()
    old_glyphs[cmap[code]].draw(before)
    new_glyphs[result_cmap[code]].draw(after)
    assert before.value == after.value, f'Changed outline: U+{code:04X}'
print(f'Home font: {len(characters)} characters, {target.stat().st_size} bytes; outlines unchanged.')
