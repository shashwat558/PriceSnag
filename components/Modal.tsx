"use client"

import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import Image from 'next/image'
import React, { Fragment, useState } from 'react'

const Modal = () => {
  let [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setemail] = useState("");

  const openModel = () => setIsOpen(true);
  const closeModel = () => setIsOpen(false);

  return (
    <>
      <button className='btn' onClick={() => setIsOpen(true)}>Track</button>
      <Transition show={isOpen} appear as={Fragment}>
        <Dialog as='div' onClose={closeModel} className="relative z-50">
          <div className='fixed inset-0 bg-black bg-opacity-25' aria-hidden="true" />
          
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4'>
              <DialogPanel className='dialog-content bg-white rounded-lg p-5 shadow-lg'>
                <div className='flex flex-col'>
                  <div className='flex justify-between'>
                    <div className='p-3 border border-gray-200 rounded-10'>
                      <Image
                        src={'/assets/icons/logo.svg'}
                        alt='logo'
                        height={28}
                        width={28}
                      />
                    </div>
                    <Image
                      src={"/assets/icons/x-close.svg"}
                      alt='close'
                      width={24}
                      height={24}
                      className='cursor-pointer'
                      onClick={closeModel}
                    />
                  </div>
                  <h4 className='dialog-head_text'>
                    Stay up to date with product alert right in your inbox
                  </h4>
                  <p className='text-sm text-gray-600 mt-2'>
                    Never miss a bargain again with our timely updates.
                  </p>
                </div>
                <form action="" className='flex flex-col mt-5'>
                  <label htmlFor="email" className='text-sm font-medium text-gray-700'>
                    Email address
                  </label>
                  <div className='dialog-input_container'>
                    <Image
                      src={"/assets/icons/mail.svg"}
                      alt='mail'
                      width={18}
                      height={18}
                    />
                    <input
                      type="email"
                      id='email'
                      placeholder='Enter your email address'
                      className='dialog-input'
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </div>
                  <button type='submit' className='dialog-btn'>{isSubmitting? 'Submitting...': "Track"}</button>
                </form>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Modal
