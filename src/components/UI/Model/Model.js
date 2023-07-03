import React from 'react'
import { Button, Modal, Row } from 'react-bootstrap';

export default function NewModel(props) {
  return (
       
      <Modal size={props.sz} show={props.show} onHide={() => props.setshow(false)} {...props}>

      <Modal.Header closeButton >
        <Modal.Title >{props.modelTitle}</Modal.Title>
      </Modal.Header>
 
      <Modal.Body>
         {props.children}
      </Modal.Body>
      <Modal.Footer>
        {(!props.buttons)&&<Button variant="primary" onClick={props.handleClose}>
          Save Changes
        </Button>}{
          props.buttons && props.buttons.map((button)=>
          <Button variant={button.color} onClick={button.onClick}>
            {button.label}
          </Button>          
          )
        }
      </Modal.Footer>
    </Modal>
  )
}
