import React from "react";
import "./ModalView.scss";
import { useDispatch, useSelector } from "react-redux";
import { POST_ACTION_HIDEMODAL_DETAIL } from "../../redux/actions/simp.action";

const ModalView = ({ children, isActive }) => {
  // REDUX STATE
  const dispatch = useDispatch();
  const state = useSelector((state) => state);



  const onCloseModal = () => {
    dispatch(POST_ACTION_HIDEMODAL_DETAIL());
  };

  return (
    <div className="ModalView">
      {isActive && (
        <div className="modal-view_container">
          <div className="modal-view_backdrop">
            <div className="view-close" onClick={onCloseModal}>
              <i class="bi bi-x"></i>
            </div>
          </div>
          <div className="modal-view_content">{children}</div>
        </div>
      )}
    </div>
  );
};

export default ModalView;
