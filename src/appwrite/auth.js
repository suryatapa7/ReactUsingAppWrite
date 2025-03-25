import config from "../config";
import { Client, Account, ID } from "appwrite";

const client = new Client();
client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
const account = new Account(client);

export async function createAccount({ email, password, name }) {
    try {
        const userAccount = await account.create(
            ID.unique(),
            email,
            password,
            name
        );
        if (userAccount) {
            return await login({ email, password });
        } else {
            return userAccount;
        }
    } catch (error) {
        throw error;
    }
}

async function login({ email, password }) {
    try {
        return await account.createEmailPasswordSession(email, password);
    } catch (error) {
        throw error;
    }
}

async function getCurrentUser() {
    try {
        return await account.get();
    } catch (error) {
        console.log("App write service -> getCurrentUser -> error", error);
    }
}

async function logout() {
    try {
        return await account.deleteSessions();
    } catch (error) {
        console.log("App write service -> logout -> error", error);
    }
}

export default {
    createAccount,
    login,
    getCurrentUser,
    logout
}

