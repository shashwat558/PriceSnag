"use client"

import { Description, Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'

const Modal = () => {
  let [isOpen, setIsOpen] = useState(false)

  const openModel = () => setIsOpen(true)
    
  return (
    <>
      <button className='btn' onClick={() => setIsOpen(true)}>Track</button>
      <Transition show-{isOpen} as={Fragment}>
         <Dialog as='div'  open={isOpen} onClose={() => setIsOpen(false)} className="dialog-container">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Deactivate account</DialogTitle>
            <Description>This will permanently deactivate your account</Description>
            <p>Are you sure you want to deactivate your account? All of your data will be permanently removed.</p>
            <div className="flex gap-4">
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={() => setIsOpen(false)}>Deactivate</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      </Transition>
     
    </>
  )
}

export default Modal