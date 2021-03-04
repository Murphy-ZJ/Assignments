const storeNameInput = document.getElementById('storeNameInput')
const storeContentInput = document.getElementById('storeContentInput')
const btnSubmit = document.getElementById('btnSubmit')
const contentWrapper = document.getElementById('contentWrapper')
const storeList = document.getElementById('storeList')
const storeContentUpdate = document.getElementById('storeContentUpdate')

function deleteStoreName(storeId) {
    db.collection("stores")
        .doc(storeId)
        .delete()
        .then(() => {
            fetchStoreNameAll()
        })
}

function addStoreContent(contentID) {
    let contentRef = db.collection("stores").doc(contentID)
    contentRef.update({
        content: firebase.firestore.FieldValue.arrayUnion(storeContentUpdate.value)
      });
      fetchStoreNameAll()
}

function delStoreContent(contentID) {
    let contentRef = db.collection("stores").doc(contentID)
    contentRef.update({
        content: firebase.firestore.FieldValue.arrayRemove(storeContentUpdate.value)
      });
      fetchStoreNameAll()
}

function fetchStoreNameAll() {
    storeList.innerHTML = ''
    db.collection("stores")
    .get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            let dataRaw = doc.data()
            let storeData = `<li>${dataRaw.name}</li><button onclick="deleteStoreName('${doc.id}')">Delete</button><button onclick="addStoreContent('${doc.id}')">Add Item</button><button onclick="delStoreContent('${doc.id}')">Remove Item</button><br>Content: ${dataRaw.content}`
            storeList.insertAdjacentHTML('beforeend', storeData)
        })
    })
}

btnSubmit.addEventListener('click', (e) => {
    e.preventDefault()
    const storeName = storeNameInput.value
    const storeContent = storeContentInput.value
    db.collection("stores")
    .add({
        name: storeName,
        content: [storeContent]
    }).then((docRef) => {
        fetchStoreNameAll()
    })
    fetchStoreNameAll()
})

fetchStoreNameAll()