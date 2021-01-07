
// get 1 data with id from what doc of firebase
export function getDataFromDoc(doc) {
  const data = doc.data()
  data.id = doc.id
  return data
}
// get all data with id from docs of firebase
export function getDataFromDocs(data) {
  return data.docs.map(getDataFromDoc)
}
/**
 * 
 * @param {String} key 
 * @param {Object} value 
 */
// save a data to localStorage with key and value
export function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
// get data from localStorage with key
export function getItemLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}
// save data to storage and return the link to storage
export async function upLoadFileToStorage(file){
  //link to this file
  const fileName = file.name;
  const filePath = `file/${fileName}`;
  const ref = firebase.storage().ref().child(filePath);
  await ref.put(file);
  return getFileUrl(ref) ;
}
//return the link to storage with fileRef 
function getFileUrl(fileRef) {
  return `https://firebasestorage.googleapis.com/v0/b/${fileRef.bucket}/o/${encodeURIComponent(fileRef.fullPath)}?alt=media`
}
//add a item to array in firebase firestore with id of collection and path of storage 
export function updateMessage(message, id){
  const dataUpdate = {
    messages: firebase.firestore.FieldValue.arrayUnion(message)
  }
  firebase.firestore().collection("conversations").doc(id).update(dataUpdate)
}
// input is a ISOdate and output is dd//mm/yy hh:mm
export function convertDate(dateStr) {
  const date = new Date(dateStr)
  const day = date.getDay();
  const month = date.getMonth() + 1;
  const year = date.getFullYear()
  const hour = date.getHours()
  const minute = date.getMinutes()
  return `${day}/${month}/${year} ${hour}:${minute}`
}
export function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}