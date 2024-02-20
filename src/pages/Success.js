
function FormSuccess() {
    let fieldData = {
        fName: "John",
        lName: "Doe",
        date: "01/01/2000",
        email: "",
        phone: "",
        street: "",
        city: "",
        province: "",
        postal: "",
        isMinor: false,

    }
    return (
        <main className="cardStyle flexCol gap1">

            <img className="logo" src='./logo.png' alt="Completion" />
            <h1>Congratulations!</h1>
            <p>Your Form has been Successfully Submitted!</p>
            <section className="line"></section>
            <h3>Get ready to embark on a thrilling journey of virtual scratch-offs and a chance to win BuyMore Dollars.</h3>

            <section className="innerCard">
                <h3>Here's a quick summary of your submission:</h3>
                <span><strong>Full Name:</strong><p>{`${fieldData.fName} + ${fieldData.lName}`} </p></span>
                <span><strong>Date of Birth:</strong><p>{fieldData.date}</p></span>
                <span><strong>Email Address:</strong><p>{fieldData.email}</p></span>
                <span><strong>Phone Number:</strong><p>{fieldData.phone}</p></span>
                <span><strong>Street Address:</strong><p>{fieldData.street}</p></span>
                <span><strong>City:</strong><p>{fieldData.city}</p></span>
                <span><strong>Province:</strong><p>{fieldData.province}</p></span>
                <span><strong>Postal Code:</strong><p>{fieldData.postal}</p></span>

                {fieldData.isMinor ? (
                    <div id="parentInfo">
                        <span><strong>Guardian's First Name:</strong><p>{fieldData.guardianNameFirst}</p></span>
                        <span><strong>Guardian's Last Name:</strong><p>{fieldData.guardianNameLast}</p></span>
                        <span><strong>Guardian's Email:</strong><p>{fieldData.guardianEmail}</p></span>
                        <span><strong>Guardian's Phone Number:</strong><p>{fieldData.guardianPhone}</p></span>
                    </div>
                ) : null}
            </section>

            <p className="text20 extraLight">Hit the next button to start scratching!</p>
            <button className="blueButton" >Next</button>

        </main>
    )
}

export default FormSuccess;