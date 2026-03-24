import {create} from "zustand"
import {axiosInstance} from "../utils/axios.js"
import {toast} from "react-hot-toast"

export const useUserStore = create((set,get)=>({

     user:null,
     isLoading:false,
     isCheckingAuth:true,

     login: async({email,password})=>{
         try {
          
         } catch (error) {
          
         } finally {

         }
     },

     checkAuth: async()=>{
          set({isCheckingAuth:false})
          try {
               const res = await axiosInstance.get("/user/checkAuth");

               if(!res.data.user){
                    toast.error("no user found")
                    return;
               }
               console.log(res.data.user)
               set({user:res.data.user})
               toast.success("hii user")
               
               return;
         } catch (error) {
               console.log(error)
               return ;
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