import React from "react";
import './FloatingDeleteButton.css'
import { deleteProductsFromDb } from "../ProductFeed/ProductFeedSlice";
import routes from "../../constants/routes";
import { toast } from "react-toastify";

export default function FloatingDeleteButton(props) {
    return(
        <button className="btn btn-danger circle floating-bottom" onClick={ () => {
            if(props.loggedIn) {
                console.log(props.deleteList)
                props.dispatch(deleteProductsFromDb(props.deleteList, () => toast.error('Product(s) deleted!')))
            } 
            else
                props.history.push(routes.LOGIN);
            } }>
            <i className="far fa-trash-alt"></i>
        </button>
    );
}