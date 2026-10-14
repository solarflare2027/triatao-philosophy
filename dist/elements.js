import {creationContent,creationElementPage,creationOrder,creationLayers} from './creation.js?v=20261014-choice11';

// Navigation and search use the same definitions as the current theory pages.
export const elements=creationOrder.map(id=>{
 const content=creationContent[id];
 return {id,name:content.name,layer:creationLayers.find(layer=>layer.parts.includes(id)).id,
  essence:content.thesis,intro:content.definition.join(''),question:content.question};
});
export {creationLayers as layers,creationElementPage as elementPage};
