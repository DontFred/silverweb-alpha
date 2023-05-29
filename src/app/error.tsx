'use client'
import { Button, Modal, Text } from '@nextui-org/react'
import React from 'react'

export default function error({error, reset}: {error: any, reset: any}){
  return (
    <div>
        <Modal open={true} blur preventClose width="100%" css={{
                  width: '90%',
                  m: '0 auto',
                  "@md": {
                      width: '45%',
                  },
                  "@lg": {
                      width: '45%',
                  },
        }}>
          <Modal.Header>
          <Text h2 css={{display: "inline"}}>A error is occurred!</Text>
          </Modal.Header>
          <Modal.Body>
            <div
              style={{
                margin: 20
              }}
            >
              <b>{error.message}</b><br/>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onPress={()=>{location.reload()}} auto bordered>
              Reload
            </Button>
            <Button onPress={reset} auto bordered>
              Retry
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  )
}

