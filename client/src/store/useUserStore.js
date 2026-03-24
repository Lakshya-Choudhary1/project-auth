import {create} from "zustand"
import {axiosInstance} from "../utils/axios.js"
import {toast} from "react-hot-toast"

export const useUserStore = create((set,get)=>({

     user:null,
     isLoading:false,
     isCheckingAuth:false,

     login: async({email,password})=>{
         try {
          
         } catch (error) {
          
         } finally {

         }
     },

     checkAuth: async () => {
           set({ isCheckingAuth: true });
               
           try {
           const res = await axiosInstance.get("/user/checkAuth");
          
           if (!res.data.user) {
             set({ user: null });
             return;
           }
      
           console.log("checkAuth user :", res.data.user);
           set({ user: res.data.user });
          } catch (error) {
          console.log("checkAuth error:", error?.response?.data || error.message);
           set({ user: null });
          } finally {
          set({ isCheckingAuth: false });
          }
          }
     ,

     logout: async()=>{
          try {
          
         } catch (error) {
          
         } finally {
          
         }
     },

     signup: async()=>{
          try {
          
         } catch (error) {
          
         } finally {
          
         }
     },

     verifyEmail: async()=>{
          try {
          
         } catch (error) {
          
         } finally {
          
         }
     },

     forgotPassword: ()=>{
          try {
          
         } catch (error) {
          
         } finally {
          
         }
     },

     resetPassword: ()=>{
          try {
          
         } catch (error) {
          
         } finally {
          
         }
     },

     resendSignUpToken:()=>{
          try {
          
         } catch (error) {
          
         } finally {
          
         }
     }

})) 