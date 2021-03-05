const storeNameInput = document.getElementById("storeNameInput");
const storeContentInput = document.getElementById("storeContentInput");
const btnSubmit = document.getElementById("btnSubmit");
const contentWrapper = document.getElementById("contentWrapper");
const storeList = document.getElementById("storeList");
const storeContentUpdate = document.getElementById("storeContentUpdate");
const submitWrapper = document.getElementById("submitWrapper");

/// Auth
const userEmail = document.getElementById("userEmail");
const userPass = document.getElementById("userPass");
const logIn = document.getElementById("logIn");
const logOut = document.getElementById("logOut");
const signUp = document.getElementById("signUp");

function deleteStoreName(storeId) {
  db.collection("stores")
    .doc(storeId)
    .delete()
    .then(() => {
      fetchStoreNameAll();
    });
}

function addStoreContent(contentID) {
  let contentRef = db.collection("stores").doc(contentID);
  contentRef.update({
    content: firebase.firestore.FieldValue.arrayUnion(storeContentUpdate.value),
  });
  fetchStoreNameAll();
}

function delStoreContent(contentID) {
  let contentRef = db.collection("stores").doc(contentID);
  contentRef.update({
    content: firebase.firestore.FieldValue.arrayRemove(
      storeContentUpdate.value
    ),
  });
  fetchStoreNameAll();
}

function fetchStoreNameAll() {
  storeList.innerHTML = "";
  db.collection("stores")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        let dataRaw = doc.data();
        let storeData = `
        <li>${dataRaw.name}</li>
        <button onclick="deleteStoreName('${doc.id}')">Delete</button>
        <button onclick="addStoreContent('${doc.id}')">Add Item</button>
        <button onclick="delStoreContent('${doc.id}')">Remove Item</button>
        <br>Content: ${dataRaw.content}
        `;
        storeList.insertAdjacentHTML("beforeend", storeData);
      });
    });
}

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const storeName = storeNameInput.value;
  const storeContent = storeContentInput.value;
  db.collection("stores")
    .add({
      name: storeName,
      content: [storeContent],
      author: userID
    })
    .then((docRef) => {
      fetchStoreNameAll();
    });
  fetchStoreNameAll();
});

/// Auth
logIn.addEventListener("click", (e) => {
  const email = userEmail.value;
  const pass = userPass.value;
  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch((e) => console.log(e.message));
});

signUp.addEventListener("click", () => {
  const email = userEmail.value;
  const pass = userPass.value;
  const promise = auth.createUserWithEmailAndPassword(email, pass);
  promise.catch((e) => console.log(e.message));
});

logOut.addEventListener("click", () => {
  auth.signOut();
});

///Realtime Listener
auth.onAuthStateChanged((firebaseUser) => {
  if (firebaseUser) {
    userID = firebaseUser.uid
    logOut.classList.remove("hidden");
    submitWrapper.classList.remove("hidden");
    contentWrapper.classList.remove("hidden");
  } else {
    console.log("Not signed in");
    logOut.classList.add("hidden");
    submitWrapper.classList.add("hidden");
    contentWrapper.classList.add("hidden");
  }
});
fetchStoreNameAll();