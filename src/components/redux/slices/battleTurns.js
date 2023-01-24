import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTurn: 0,
  myDmg: [0],
  enemyDmg: [0],
  myHp: 100,
  enemyHp: 100,
  myAttack: [""],
  myDescription: [""],
  enemyAttack: [""],
  enemyDiscription: [""],
};

const battleTurns = createSlice({
  name: "battleTurn",
  initialState,
  reducers: {
    attack(state, action) {
      state.myHp = state.myHp - action.payload.enemyDmg;
      state.enemyHp = state.enemyHp - action.payload.myDmg;
      state.currentTurn = state.currentTurn + 1;
      state.myAttack = state.myAttack.push(action.payload.myAttack);
      state.enemyAttack = state.enemyAttack.push(action.payload.enemyAttack);
      state.myDescription = state.myDescription.push(action.payload.myDescription);
      state.enemyDescription = state.enemyDescription.push(action.payload.enemyDescription);
      state.myDmg = state.myDmg.push(action.payload.myDmg);
      state.enemyDmg = state.enemyDmg.push(action.payload.enemyDmg);
    },
  },
});

export const { attack } = battleTurns.actions;

export default battleTurns.reducer;
