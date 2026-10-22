"""Extend the approved Chinese subset; keep all existing characters and outlines.

Offline maintenance with fonttools[woff]. Pass an authored text/JS file as argv[1].
"""
from pathlib import Path
import sys
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.pens.recordingPen import DecomposingRecordingPen

root = Path(__file__).resolve().parent.parent
target = root / 'dist/assets/fonts/gen-ryu-min.woff2'
source = root / 'dist/assets/fonts/gen-ryu-min.ttf'
old = TTFont(target)
old_cmap = old.getBestCmap()
full = TTFont(source)
full_cmap = full.getBestCmap()
text = (root / sys.argv[1]).read_text()
characters = set(old_cmap) | (set(map(ord, text)) & set(full_cmap))
options = subset.Options()
options.layout_features = ['*']
full.recalcTimestamp = False
subsetter = subset.Subsetter(options=options)
subsetter.populate(unicodes=characters)
subsetter.subset(full)
full.flavor = 'woff2'
temporary = target.with_suffix('.tmp.woff2')
full.save(temporary)

result = TTFont(temporary)
cmap = result.getBestCmap()
assert characters <= set(cmap)
old_glyphs, new_glyphs = old.getGlyphSet(), result.getGlyphSet()
for code, name in old_cmap.items():
    assert old['hmtx'].metrics[name] == result['hmtx'].metrics[cmap[code]]
    before = DecomposingRecordingPen(old_glyphs)
    after = DecomposingRecordingPen(new_glyphs)
    old_glyphs[name].draw(before)
    new_glyphs[cmap[code]].draw(after)
    assert before.value == after.value, f'Changed outline U+{code:04X}'
old.close()
result.close()
temporary.replace(target)
print(f'Preserved {len(old_cmap)} characters; added {len(characters)-len(old_cmap)}; {target.stat().st_size} bytes.')
