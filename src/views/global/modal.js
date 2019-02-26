import React, { Component } from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

export function modal(params){
    confirmAlert({
        customUI: ({ onClose, onConfirm }) => {
            let view_btn = []
            if(params.btns){
                params.btns.map((btn, idx) => {
                    let { label, className, event } = btn
                    
                    if(event == undefined){
                        event = onClose
                    }
                    
                    view_btn.push(
                        <a href="javascript:void(0);" key={idx} className={className} onClick={event}>{label}</a>
                    )
                })
            } else {
                view_btn.push(
                    <a href="javascript:void(0);" key={Math.random()} className="btn bcred cwhite" onClick={onClose}>Ulangi</a>
                )
            }

            let description = ''
            if(params.description){
                description = <div className="disblock margin-bottom-3">
                    <span className="description">{params.description}</span>
                </div>
            }

            return (
                <div className="react-confirm-alert modal-alert">
                    <div className="react-confirm-alert-body">
                        <div className="header align-center">
                            <h1>{params.message}</h1>
                        </div>
                        <div className="react-confirm-alert-button-group toggle">
                            <div className="align-center fullwidth">
                                {description}
                                {view_btn}
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
    })
}

export function error(params){
    confirmAlert({
        customUI: ({ onClose, onConfirm }) => {
            let view_btn = []
            if(params.btns){
                params.btns.map((btn, idx) => {
                    const { label, className, event } = btn

                    // if(event == 'close'){
                    //     event = onClose
                    // }

                    view_btn.push(
                        <a href="javascript:void(0);" key={idx} className={className} onClick={onClose}>{label}</a>
                    )
                })
            } else {
                view_btn.push(
                    <a href="javascript:void(0);" key={Math.random()} className="btn bcred cwhite" onClick={onClose}>Ulangi</a>
                )
            }

            return (
                <div className="react-confirm-alert modal-alert">
                    <div className="react-confirm-alert-body">
                        <div className="header align-center">
                            <h1>{params.message}</h1>
                        </div>
                        <div className="react-confirm-alert-button-group toggle">
                            <div className="align-center fullwidth">
                                {view_btn}
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
    })
}

export function disable(params) {
    confirmAlert({
        customUI: ({ onClose, onConfirm }) => {
            let view_btn = []

            return (
                <div className="react-confirm-alert modal-alert">
                    <div className="react-confirm-alert-body">
                        <div className="header align-center">
                            <h1>{params.message}</h1>
                        </div>
                        <div className="react-confirm-alert-button-grop toggle">
                            <div className="align-center fullwidth">
                                <div style={{marginTop: "10px"}}>Silahkan gunakan tablet atau komputer dengan layar 10 inci.</div>
                                {view_btn}
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
    })
}