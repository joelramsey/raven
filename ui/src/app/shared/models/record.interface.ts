export interface Record {
  id:number;
  title?:string;
  result:AlchemyResult
}

export interface AlchemyResult {
  status:string;
  usage:string;
  url?:string;
  totalTransactions:string;
  language:string;
  text:string;
  title:string;
  image:string;
  author:string;
  docSentiment:AlchemyDocSentiment;
  concepts:Array<AlchemyConcept>;
  entities:Array<AlchemyEntity>;
  typedRelations:Array<AlchemyTypedRelation>;
  model:string;
  docEmotions:AlchemyEmotion;
}

export interface AlchemyDocSentiment {
  type:string;
  score:string;
  mixed:string;
}

export interface AlchemyReference {
  geo?:string;
  website?:string;
  ciaFactbook?:string;
  freebase?:string;
  opencvc?:string;
  yago?:string;
  crunchbase?:string;
}

export interface AlchemyConcept extends AlchemyReference {
  text:string;
  relevance:string;
  dbpedia:string;
  knowledgeGraph?:AlchemyKnowledgeGraph;
}

export interface AlchemyEntity {
  type:string;
  relevance:string;
  knowledgeGraph:AlchemyKnowledgeGraph;
  sentiment:AlchemySentiment;
  count:string;
  text:string;
  disambiguated?:AlchemyDisambiguation;
}

export interface AlchemyKnowledgeGraph {
  typeHierarchy:string;
}

export interface AlchemySentiment {
  type:string;
  score:string;
  mixed:string;
}

export interface AlchemyDisambiguation extends AlchemyReference {
  name:string;
  subType?:Array<string>;
}

export interface AlchemyEmotion {
  anger:string;
  disgust:string;
  fear:string;
  joy:string;
  sadness:string;
}

export interface AlchemyTypedRelation {
  arguments:Array<AlchemyRelationArgument>;
  score:string;
  sentence:string;
  type:string;
}

export interface AlchemyRelationArgument {
  entities:Array<AlchemyArgumentEntity>;
  part:string;
  text:string;
}

export interface AlchemyArgumentEntity {
  id:string;
  text:string;
  type:string;
}