import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import Message from "./components/Message";
import { app } from "./firebase";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { behaviorPlugin } from "@testing-library/user-event/dist/keyboard/types";

const auth = getAuth(app);
const db = getFirestore(app);

const loginHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

const logoutHandler = () => signOut(auth);

function App() {
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const divForScroll = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"));

    const unsubscribe = onAuthStateChanged(auth, (data) => {
      setUser(data);

      console.log(data);
      if (data) {
        window.scroll({
          top: 0,
          behavior: "smooth",
        });
      }
    });

    const unsubscribeForMessage = onSnapshot(q, (snap) => {
      if (user != null) {
        setMessages(
          snap.docs.map((item) => {
            const id = item.id;
            return { id, ...item.data() };
          })
        );
        divForScroll.current.scrollIntoView(false);
      }
    });

    return () => {
      unsubscribe();
      unsubscribeForMessage();
    };
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      await addDoc(collection(db, "Messages"), {
        text: message,
        uid: user.uid,
        url: user.photoURL,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Box bg={"red.50"} overflowY={"auto"}>
      <Container h={"100vh"} bg="white">
        <VStack paddingY={"4"} h={"full"}>
          <Button onClick={logoutHandler} colorScheme="red" w={"full"}>
            Logout
          </Button>
          <VStack
            width={"full"}
            h={"full"}
            overflowY={"auto"}
            css={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {user != null &&
              messages.map((item) => (
                <Message
                  key={item.id}
                  user={item.uid === user.uid ? "me" : "other"}
                  text={item.text}
                  url={item.url}
                />
              ))}

            <div ref={divForScroll}></div>
          </VStack>

          <form
            onSubmit={submitHandler}
            style={{ width: "100%", backgroundColor: "blue" }}
          >
            <HStack>
              <Input
                value={message}
                placeholder="Enter a message..."
                onChange={(e) => setMessage(e.target.value)}
              />

              <Button colorScheme="purple" type="submit">
                Send
              </Button>
            </HStack>
          </form>
        </VStack>
      </Container>
      <VStack bg={"white"} justifyContent="center" h="100vh">
        <Button colorScheme="purple" onClick={loginHandler}>
          Sign In With Google
        </Button>
      </VStack>
    </Box>
  );
}

export default App;
