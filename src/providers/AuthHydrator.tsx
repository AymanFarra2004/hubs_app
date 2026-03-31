"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/src/store/authSlice";

export default function AuthHydrator({ user }: { user: any }) {
  const dispatch = useDispatch();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && user) {
      dispatch(loginSuccess(user));
      initialized.current = true;
    }
  }, [dispatch, user]);

  return null;
}
