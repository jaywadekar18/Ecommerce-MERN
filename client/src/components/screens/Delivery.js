import {
    Container,
    Card,
    makeStyles,
    TextField,
    Button,
    Typography,
    Select,
    MenuItem,
} from "@material-ui/core";
import { React, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import style from "./style.module.css";
import axios from "axios";
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
const useStyles = makeStyles({
    inputFields: {
        width: "100%",
        marginTop: "20px",
        borderRadius: "4px",
        height: 30,
    },
    mainCard: {
        margin: "5vh auto",
        padding: "4vh 5vh",
    },
    title: {
        fontSize: "20px",
        fontWeight: "bold",
        textAlign: "center",
    },
    card: {
        margin: "10px auto",
        padding: "5px 5px",
    },
    totalPrice: {
        fontSize: "20px",
        fontWeight: "bold",
    },
    price: {
        fontSize: "20px",
    },
    placeOrderButton: {
        marginTop: "30px",
    },
});
function Delivery() {
    const history = useHistory();
    const classes = useStyles();

    const user = useSelector((state) => state.user);
    const [stripePromise, setStripePromise] = useState(() =>
        loadStripe(
            "pk_test_51LLpYxSEBIn8xeAa4bg3tT3AqAURorGrk7DgDSN0eIDl8HAesDwC1dUbCN7xDKPdoCFu1nce5XxJeCOBiNdXq2bq00sFCS291N"
        )
    );

    const cartItems = useSelector((state) => state.cart);
    // const stripePromise = loadStripe();
    function change(event) {
        console.log("event", event.target.value);
        if (event.target.value) {
            //setMode(event.target.value)
        }
    }
    function totalPrice() {
        console.log("called");

        return cartItems.data.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
    }
    async function saveDetails(data) {
        try {
            await axios.post("/api/orders", data);
        } catch (err) {
            console.log("err", err);
        }
    }
    const CheckoutForm = () => {
        const [mode, setMode] = useState("cash");
        const stripe = useStripe();
        const elements = useElements();
        let formObject = {};
        const handleSubmit = async (event) => {
            event.preventDefault();

            if (event.target) {
                event.preventDefault();
                let formData = new FormData(event.target);
                for (let [key, value] of formData.entries()) {
                    formObject[key] = value;
                }
            }
            console.log("form", formObject);
            const billingDetails = {
                name: user.loggedInUser.name,
                email: user.loggedInUser.email,
                address: {
                    city: formObject.city,
                    line1: formObject.line1,
                    state: formObject.state,
                    postal_code: formObject.postal_code,
                },
            };
            if (formObject.paymentMode == "online") {
                const { data: clientSecret } = await axios.post(
                    "/api/orders/payment_intent",
                    {
                        amount: totalPrice() * 100,
                    }
                );
                const { error, paymentMethod } = await stripe.createPaymentMethod({
                    type: "card",
                    card: elements.getElement(CardElement),
                    billing_details: billingDetails,
                });

                console.log("payment method", paymentMethod);
                if (paymentMethod) {
                    const { paymentIntent, error: stripeError } =
                        await stripe.confirmCardPayment(clientSecret, {
                            payment_method: paymentMethod.id,
                        });
                }
            }

            let completeData = {
                ...billingDetails,
                phoneNumber: parseInt(formObject.phoneNumber),
                amount: 344,
                paymentStatus: true,
            };
            saveDetails(completeData);
        };

        return (
            <>
                <form onSubmit={handleSubmit}>
                    <input
                        required
                        className={classes.inputFields}
                        type="number"
                        name="phoneNumber"
                        placeholder="Phone number"
                    />
                    <input
                        required
                        className={classes.inputFields}
                        name="line1"
                        placeholder="Line 1"
                    />
                    <input
                        required
                        className={classes.inputFields}
                        name="city"
                        placeholder="City"
                    />
                    <input
                        required
                        className={classes.inputFields}
                        name="state"
                        placeholder="State"
                    />
                    <input
                        required
                        className={classes.inputFields}
                        name="postal_code"
                        placeholder="Postal code"
                    />
                    <select
                        required
                        className={classes.inputFields}
                        name="paymentMode"
                        onChange={(event) => {
                            setMode(event.target.value);
                        }}
                    >
                        <option value="cash">Cash On Delivery</option>
                        <option value="online">Online Payment</option>
                    </select>
                    {mode == "online" && <CardElement className={style.StripeElement} />}

                    <button type="submit" disabled={!stripe || !elements}>
                        Pay
                    </button>
                </form>
            </>
        );
    };

    return (
        <Container>
            <Card className={classes.mainCard}>
                <Typography className={classes.title}>Delivery and Payment</Typography>
                <Typography>Products </Typography>
                {cartItems &&
                    cartItems.data &&
                    cartItems.data.map((item) => (
                        <Card className={classes.card} elevation={3}>
                            <Typography className={classes.price}>
                                {item.name}(Rs.{item.price}) X {item.quantity} = Rs.
                                {item.quantity * item.price}{" "}
                            </Typography>

                            <p>+</p>
                        </Card>
                    ))}
                <Typography className={classes.totalPrice}>
                    Total amount={totalPrice()}{" "}
                </Typography>

                <br />
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </Card>
        </Container>
    );
}

export default Delivery;
