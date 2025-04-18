import FormEEFT from './form8843';
import "./dashboard.css"
import { useSelector, useDispatch } from "react-redux";
import { getSelectedForm } from "../../redux/actions/action";

const Form = () => {
    const selectedForm = useSelector((state: any) => state.selectedForm);
    const dispatch = useDispatch();

    return (
        <>
            <section className="form">
                <h2 className="mb-3">{ selectedForm ? "From " + selectedForm : "Choose Form" }</h2>
                {
                    !selectedForm ? 
                    <ul className="form-list">
                        <li onClick={() => dispatch(getSelectedForm(8843))}><span>8843</span></li>
                    </ul> : 
                    <></>
                }
                {
                    selectedForm === 8843 ? 
                    <FormEEFT /> : 
                    <></>
                }
            </section>
        </>
    );
};

export default Form;