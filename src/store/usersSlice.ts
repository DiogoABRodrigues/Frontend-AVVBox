// store/usersSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../models/User";
import { userService } from "../services/usersService";

// Estado inicial
interface UsersState {
  allUsers: User[];
  allAllUsers: User[];
  myAthletes: User[];
  loading: boolean;
  error?: string;
}

const initialState: UsersState = {
  allUsers: [],
  allAllUsers: [],
  myAthletes: [],
  loading: false,
  error: undefined,
};

// Thunks assíncronos
export const fetchAllUsers = createAsyncThunk("users/fetchAll", async () => {
  const users = await userService.getAll();
  return users;
});

export const fetchAllAllUsers = createAsyncThunk(
  "users/fetchAllAll",
  async () => {
    const users = await userService.getAllAll();
    return users;
  }
);

export const fetchMyUsers = createAsyncThunk(
  "users/fetchMyUsers",
  async (trainerId: string) => {
    const users = await userService.getMyAthletes(trainerId);
    return users;
  }
);

// Função utilitária para ordenar pelo nome
const sortUsersByName = (users: User[]) =>
  users.slice().sort((a, b) => a.name.localeCompare(b.name));

// Slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearMyUsers: (state) => {
      state.myAthletes = [];
    },
    clearAllUsers: (state) => {
      state.allUsers = [];
      state.allAllUsers = [];
    },
  },
  extraReducers: (builder) => {
    // fetchAllUsers
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(
      fetchAllUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.allUsers = sortUsersByName(action.payload);
        state.loading = false;
      }
    );
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // fetchAllAllUsers
    builder.addCase(fetchAllAllUsers.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(
      fetchAllAllUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.allAllUsers = sortUsersByName(action.payload);
        state.loading = false;
      }
    );
    builder.addCase(fetchAllAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // fetchMyUsers
    builder.addCase(fetchMyUsers.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(
      fetchMyUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.myAthletes = sortUsersByName(action.payload);
        state.loading = false;
      }
    );
    builder.addCase(fetchMyUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearMyUsers, clearAllUsers } = usersSlice.actions;
export default usersSlice.reducer;
