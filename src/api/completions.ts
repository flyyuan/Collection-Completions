import fetch from "./fetch";

const getCompletionList = async () => {
  const completionsRes = await fetch.get<any,{data: {label:string, insertText:string,id:number,userId:number}[]}>("/completions");
  return completionsRes;
};

export { getCompletionList };
