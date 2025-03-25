import config from "../config";
import { Client, Databases, Storage, Query, ID } from "appwrite";

const client = new Client();
client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
const databases = new Databases(client);
const bucket = new Storage(client);

async function createPost({ title, slug, content, image, status, userId }) {
    try {
        return await databases.createDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
            {
                title,
                content,
                image,
                status,
                userId,
            }
        )
    } catch (error) {
        console.log("App write service -> CreatePost -> error", error);
    }
}

async function updatePosts(slug, { title, content, image, status }) {
    try {
        return await databases.updateDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
            {
                title,
                content,
                image,
                status,
            }
        )
    } catch (error) {
        console.log("App write service -> updatePosts -> error", error);
    }

}

async function deletePost(slug) {
    try {
        await databases.deleteDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        );
        return true;
    } catch (error) {
        console.log("App write service -> deletePost -> error", error);
    }

}
async function getPost(slug) {
    try {
        return await databases.getDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        );
    } catch (error) {
        console.log("App write service -> getPost -> error", error);
        return false;
    }
}

async function getPosts(query = [Query.equal("status", "active")]) {
    try {
        return await databases.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            query
        )
    } catch (error) {
        console.log("App write service -> getPosts -> error", error);
    }
}



async function uploadFile(file) {
    try {
        return await bucket.createFile(config.appwriteBucketId, ID.unique(), file)
    } catch (error) {
        console.log("App write service -> uploadFile -> error", error);
        return false
    }

}

async function deleteFile(fileId) {
    console.log(fileId);
    try {
        await bucket.deleteFile(config.appwriteBucketId, fileId);
        return true;
    } catch (error) {
        console.log("App write service -> deleteFile -> error", error);
        return false;
    }
}



async function getFilePreview(fileId) {
    console.log(fileId);
    return bucket.getFilePreview(config.appwriteBucketId, fileId)
}

export default {
    createPost,
    updatePosts,
    deletePost,
    getPost,
    getPosts,
    uploadFile,
    deleteFile,
    getFilePreview
};

