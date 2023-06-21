import { projectFirestore } from "@/firebase/config"
import { ref } from "vue"

const getCollection = (collection, query) => {
    const documents = ref(null)
    const error = ref(null)

    let collectionRef = projectFirestore.collection(collection)
            .orderBy('createdAt')

        if (query) {
            collectionRef = collectionRef.where(...query)
        }
    collectionRef.onSnapshot((snap) => {
        let result = []
        snap.docs.forEach(doc => {
            doc.data().createdAt && result.push({...doc.data(), id:doc.id})
        })
        documents.value = result
        error.value = null

    }, (err) => {
        console.log(err.message);
        documents.value = null
        error.value = 'Could not fetch data'
    })
    return { error, documents}
}

export default getCollection