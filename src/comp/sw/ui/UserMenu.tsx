"use client";
import { Fragment, useState } from "react";
import {
  Badge,
  Card,
  Dropdown,
  Modal,
  User,
  Table,
  Text,
} from "@nextui-org/react";
import { UserProps } from "@/faker.d";

type MessageProps = {
  id: string;
  read: boolean;
  user: { name: string; dept: string; avatar: string };
  message: string;
  date: Date;
}

/**
 * Renders a user menu with a list of messages.
 *
 * @param {object} props - The component props.
 * @param {UserProps} props.user - The user object.
 * @param {MessageProps[]} props.messages - An array of message objects.
 * @return {JSX.Element} The JSX element representing the user menu.
 */
export default function UserMenu({
  user,
  messages,
}: {
  user: UserProps;
  messages: MessageProps[];
}) {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };

  messages.sort(getSortedMessagesByDateAndReadStatus)
  function getSortedMessagesByDateAndReadStatus(a: MessageProps, b: MessageProps){
      if (a.read !== b.read) {
        return a.read ? -1 : 1;
      } else {
        return a.date > b.date ? -1 : 1;
      }
  }
  return (
    <Fragment>
      <Modal
        width="100%"
        css={{
          width: "90%",
          m: "0 auto",
          "@sm": {
            width: "55%",
          },
          "@md": {
            width: "50%",
          },
          "@lg": {
            width: "50%",
          },
        }}
        autoMargin
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Body>
          <Table
            selectionMode="single"
            hoverable={true}
            color="secondary"
            aria-label="Message table"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
          >
            <Table.Header>
              <Table.Column>Name</Table.Column>
              <Table.Column width="60%">Message</Table.Column>

              <Table.Column>Date</Table.Column>
            </Table.Header>
            <Table.Body items={messages}>
              {(message) => (
                <Table.Row key={message.id}>
                  <Table.Cell>
                    <User
                      name={message.user.name}
                      src={message.user.avatar}
                      description={message.user.dept}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Badge
                      content="new"
                      color="error"
                      disableAnimation
                      isInvisible={!message.read}
                    >
                      {message.message}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Text b size={13}>
                      {message.date.toLocaleTimeString("en-IE", {})}
                    </Text>
                    <br />
                    <Text b size={11} css={{ color: "$accents7" }}>
                      {message.date.toLocaleDateString("en-IE", {
                        day: "numeric",
                        month: "short",
                        year: "2-digit",
                      })}
                    </Text>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
            <Table.Pagination
              noMargin
              align="center"
              rowsPerPage={5}
            />
          </Table>
        </Modal.Body>
      </Modal>
      <div
        style={{
          position: "absolute",
          right: 30,
          top: 30,
          display: "flex",
          justifyContent: "flex-end"
        }}
      >
        <div
          style={{
            zIndex: 10000,
            position: "fixed",
          }}
        >
          <Badge
            content="new"
            color="error"
            isInvisible={!messages.find((message) => !message.read) && true}
          >
            <Dropdown>
              <Dropdown.Trigger>
                <Card isPressable>
                  <Card.Body
                    css={{
                      p: "12px 0",
                    }}
                  >
                    <User
                      name={user.name}
                      src={user.avatar}
                      description={user.dept.name}
                      bordered
                      color={user.color}
                    />
                  </Card.Body>
                </Card>
              </Dropdown.Trigger>
              <Dropdown.Menu
                color="secondary"
                aria-label="User Action"
                disabledKeys={["chat"]}
                onAction={(key) => {
                  switch (key) {
                    case "logout":
                      break;
                    case "messages":
                      handler();
                      break;
                    case "profile":
                      break;
                    case "settings":
                      break;
                    default:
                      break;
                  }
                }}
              >
                <Dropdown.Item key="logout" color="error">
                  Log Out
                </Dropdown.Item>
                <Dropdown.Item key="messages" withDivider>
                  Messages
                </Dropdown.Item>
                <Dropdown.Item key="chat">SilverChat</Dropdown.Item>
                <Dropdown.Item key="profile" withDivider>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item key="settings" withDivider>
                  Settings
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Badge>
        </div>
      </div>
    </Fragment>
  );
}
