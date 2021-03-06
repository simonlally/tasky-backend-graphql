import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { Form, Button, Card, Header } from "semantic-ui-react";

import { GET_TASKS_BY_USER_QUERY, CREATE_TASK } from "../util/graphql";
import { useForm } from "../util/hooks";

const NewTask = (username) => {
  const newTask = () => {
    createTask();
    window.location.reload(false);
  };

  const { onChange, onSubmit, values } = useForm(newTask, {
    body: "",
  });

  const [createTask, { error }] = useMutation(CREATE_TASK, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: GET_TASKS_BY_USER_QUERY,
        variables: username,
      });
      data.getTasksByUser = [result.data.createTask, ...data.getTasksByUser];
      proxy.writeQuery({ query: GET_TASKS_BY_USER_QUERY, data });
      values.body = "";
    },
  });

  return (
    <div>
      <>
        <Card fluid>
          <Card.Content>
            <Form onSubmit={onSubmit}>
              <Header as="h3" textAlign="left">
                Enter a new task below
              </Header>
              <Form.Field>
                <Form.TextArea
                  rows={2}
                  placeholder="..."
                  name="body"
                  onChange={onChange}
                  value={values.body}
                  error={error ? true : false}
                />
                <Button color="blue" type="submit">
                  submit
                </Button>
              </Form.Field>
            </Form>
          </Card.Content>
        </Card>
        {error && (
          <div className="ui error message">
            <ul className="list">
              <li>{error.graphQLErrors[0].message}</li>
            </ul>
          </div>
        )}
      </>
    </div>
  );
};

export default NewTask;
