import {
    usernames,
    clientIdNums,
    clientNames,
    passwords,
    startTimes,
    days,
    telegramChatIds,
  } from "../framework/env";
  import User from "../entities/User";
  
  const splitter = (raw: string) => raw.split(";");
  
  const validateField = (expectedNumber: number, field?: string) => {
    const splitFieldLength = splitter(field!).length;
    if (splitFieldLength < expectedNumber)
      throw new Error(
        `users validation failed on field: ${field?.toString()}, got value: ${field}, expected ${expectedNumber} but got ${splitFieldLength}`
      );
  };
  
  const validateFields = (expectedNumber: number) => {
    validateField(expectedNumber, clientNames);
    validateField(expectedNumber, clientIdNums);
    validateField(expectedNumber, passwords);
    validateField(expectedNumber, startTimes);
    validateField(expectedNumber, days);
  };
  
  const getUsers = (): User[] => {
    if (!usernames)
      throw new Error("can not get users, missing usernames from env");
    const usernameList = splitter(usernames);
    const amountOfUsers = usernameList.length;
    validateFields(amountOfUsers);
    return usernameList.map(
      (username, i) =>
        new User(
          username,
          splitter(days!)[i].split(","),
          splitter(startTimes!)[i].split(","),
          splitter(passwords!)[i],
          splitter(clientIdNums!)[i],
          splitter(clientNames!)[i],
          splitter(telegramChatIds!)[i]
        )
    );
  };
  
  export default getUsers;
  