import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../../services/anecdoteServices"
/* eslint-disable no-case-declarations */

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice= createSlice({
  name:"anecdotes",
  initialState:[],
  reducers:{
    vote(state,action){
      const id = action.payload.id
      console.log("id",action )
      const anecdoteToChange = state.find(n => n.id === id)
      anecdoteToChange.votes++
    },
    createAnecdotes(state,action){
      const newAnecdote=action.payload
      console.log(action.payload)
      console.log(newAnecdote,"NEW")
      state.push({
        content: newAnecdote,
        id:getId(),
        votes:0})
    },
    sortAnecdotes(state){
      return [...state.slice().sort((a, b) => b.votes - a.votes)]
    },
    appendAnecdote(state,action){
      state.push(action.payload)
    },
    setAnecdotes(state,action){
      return action.payload
    }
  }
})


export const{vote,sortAnecdotes,appendAnecdote,setAnecdotes}=anecdoteSlice.actions

export const initalizeAnecdotes = ()=>{
  return async dispatch=>{
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdotes=(content)=>{
  return async dispatch=>{
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer
