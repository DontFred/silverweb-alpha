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


export default function UserMenu({
  user,
  messages,
}: {
  user: UserProps;
  messages:
      Array<{
        id: string;
        read: boolean;
        user: { name: string; dept: string; avatar: string };
        message: string;
        date: Date;
      }>;
}) {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };
  return (
    <Fragment>
      <Modal
        width="40%"
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
                <Table.Row key={message.date.toDateString()}>
                  <Table.Cell>
                    <User
                      name={message.user.name}
                      src={message.user.avatar}
                      description={message.user.dept}
                    />
                  </Table.Cell>
                  <Table.Cell><Badge content="new" color="error" isInvisible={!message.read}>{message.message}</Badge></Table.Cell>
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
              rowsPerPage={3}
              onPageChange={(page) => console.log({ page })}
            />
          </Table>
        </Modal.Body>
      </Modal>
      <div
        style={{
          position: "fixed",
          right: 30,
          top: 30,
        }}
      >
        <Badge content="new" color="error">
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
    </Fragment>
  );
}
