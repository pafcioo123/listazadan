import React, {Component} from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./freelancer.css";
import Form from "react-bootstrap/Form";
import * as Yup from 'yup';
import InputGroup from "react-bootstrap/InputGroup";
import {Formik} from "formik";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import {remove} from "lodash/array";
import {filter} from "lodash/collection";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class App extends Component {
    constructor(props) {
        super(props);
        this.state={
          tasks:[]
        }

    }
    delTaskWithPrompt=(index)=>{
        if (window.confirm("Czy aby na pewno?")) this.removeTask(index);
    };
    setDone=(index)=>{
      let tasks=[...this.state.tasks];
      this.setState({tasks:
              tasks.map((task,i) =>{
                  if (i===index) {
                      return {content:task.content,done:!task.done}
                  }
                  return task;
              }
              )
      }
      )
    };
    addTask=(values, actions) => {
            let tasks=[...this.state.tasks];
            tasks.push({content:values.content ,done:false});
            values.content="";
            actions.setFieldTouched("content",false);
            // console.log(actions);
            this.setState({tasks:tasks});

        console.log("add");
        console.log(this.state);
            actions.setSubmitting(false);
    };
    removeTask=(index)=>{
            this.setState({
                tasks: filter(this.state.tasks, (task, i) => {
                    console.log(index + " " + i);
                    console.log(index === i);
                    return index !== i;
                })
            });
    };
    render() {
        console.log(this.state.tasks);
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col xl="auto" lg="auto" md="auto" sm="auto" xs="auto">
                        <h1>Lista Zadań</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col>
                        <ListGroup>
                    {this.state.tasks.map((task,i)=>{
                        return <ListGroup.Item>
                            <span style={{textDecoration:(task.done)?"line-through":"none"}}>{task.content}</span>
                            <Button style={{margin:"10px"}} onClick={()=>{this.delTaskWithPrompt(i)}}>Usuń zadanie</Button>
                            <Button style={{margin:"10px"}} onClick={()=>{this.setDone(i)}}>Zrobione</Button>
                        </ListGroup.Item>
                    })}
                        </ListGroup>
                    </Col>
                </Row>
                    <Formik
                        validationSchema={Yup.object().shape({content: Yup.string().required("Nie podano treści zadania")})}
                        onSubmit={this.addTask}
                        initialValues={{content:""}}
                    >
                        {({
                              handleSubmit,
                              handleChange,
                              handleBlur,
                              values,
                              touched,
                              isValid,
                              errors,
                          }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Row>
                                    <Form.Group as={Col} ascontrolId="validationFormik01">
                                        <Form.Label>Dodaj zadanie</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="content"
                                            value={values.content}
                                            placeholder={"Treść"}
                                            onChange={handleChange}
                                            isValid={touched.content && !errors.content}
                                            isInvalid={!!errors.content}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.content}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Button type="submit">Dodaj</Button>
                            </Form>
                        )}
                    </Formik>
            </Container>
        );
    }
}

App.propTypes = {};

export default App;