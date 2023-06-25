import { Avatar, HStack, Text } from "@chakra-ui/react";
import React from "react";

const Message = ({ text, url, user }) => {
  return (
    <HStack
      alignSelf={user == "me" ? "flex-end" : "flex-start"}
      borderRadius={"base"}
      bg="gray.100"
      paddingY={"2"}
      paddingX={user === "me" ? "4" : "2"}
    >
      {user === "other" && <Avatar src={url} />}
      <Text>{text}</Text>
      {user === "me" && <Avatar src={url} />}
    </HStack>
  );
};

export default Message;
