const inputName = document.querySelector('#name');
const inputJob = document.querySelector('#job');
const inputEmail = document.querySelector('#email');
const inputPhone = document.querySelector('#phone');
const inputCompany = document.querySelector('#company');
const inputContact = document.querySelector('#contact');
const inputCoverLetter = document.querySelector('#textLetter');
const img = document.querySelector('#img-preview');


const previewCoverLetter = document.querySelector('#preview');
const mainForm = document.querySelector('#form-cover-letter');
const btnPDF = document.querySelector('#bnt-preview');
const btnReset = document.querySelector('#bnt-reset');



document.addEventListener('DOMContentLoaded', () => {
    eventListener();
});

function eventListener() {
    inputName.addEventListener('input', formData);
    inputJob.addEventListener('input', formData);
    inputEmail.addEventListener('input', formData);
    inputPhone.addEventListener('input', formData);
    inputCompany.addEventListener('input', formData);
    inputContact.addEventListener('input', formData);
    inputCoverLetter.addEventListener('input', formData);

    mainForm.addEventListener('submit', addData);
    btnPDF.addEventListener('click', generatePDF);
    btnReset.addEventListener('click', ()=>{
        location.reload();
    })

}


class UI {
    msmAlert(text) {
        const alert = document.createElement('DIV');
        alert.classList.add('alert', 'alert-danger');
        alert.textContent = text;
        mainForm.append(alert);
        setTimeout(() => {
            alert.remove();
        }, 4000);

    }
}

const ui = new UI();


function formData(e) {
    dataObj[e.target.name] = e.target.value;


}

const dataObj = {
    name: '',
    job: '',
    email: '',
    phone: '',
    company: '',
    contact: '',
    textLetter: ''
}

function addData(e) {
    e.preventDefault();
    const { name, job, email, phone, company, contact, textLetter } = dataObj;
    if (name === "" || job === "" || email === "" || phone === "" || company === "" || contact === "" || textLetter === "") {
        ui.msmAlert('All fields are required!');
        return
    }

    seePreview();

}

function seePreview() {
    btnPDF.disabled=false;
    clearHtml();

    const { name, job, email, phone, company, contact, textLetter } = dataObj;
    const textTemplate = document.createElement('DIV');
    const textTemplateFooter = document.createElement('DIV');
    const textCLetter = document.createElement('DIV');
    textTemplate.innerHTML = `<div style="height: 30px;" class="bg-info"></div>
    <div class="pt-5 px-5">
    <div class="fs-1 fw-bold text-center"> ${name}</div>
    <div class="fs-4 fw-bold text-center"> ${job}</div>
    <div style="height: 3px; width:40%" class="bg-info mx-auto mt-3 mb-4"></div>
    <div class="mt-5"> To: ${company}</div>
    <div>${contact}</div>`;

    textCLetter.innerHTML = `<div class="pt-2 px-5">${textLetter.replace(/\n/g, '<br>')}</div>`;
    textTemplateFooter.innerHTML = `<div class="py-4 my-5 px-5">
    <div class="border-start border-4 border-info ps-3">
    Contact Me
    <div class="fw-bold">${name} </div>
    <div class="font-italic"> ${job}</div>
    <div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-open" viewBox="0 0 16 16"> <path d="M8.47 1.318a1 1 0 0 0-.94 0l-6 3.2A1 1 0 0 0 1 5.4v.817l5.75 3.45L8 8.917l1.25.75L15 6.217V5.4a1 1 0 0 0-.53-.882l-6-3.2ZM15 7.383l-4.778 2.867L15 13.117V7.383Zm-.035 6.88L8 10.082l-6.965 4.18A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738ZM1 13.116l4.778-2.867L1 7.383v5.734ZM7.059.435a2 2 0 0 1 1.882 0l6 3.2A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765l6-3.2Z"/> </svg> ${email} </div>
    <div> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-phone" viewBox="0 0 16 16"> <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/> <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/> </svg>
     ${phone}</div></div></div>`;


    previewCoverLetter.append(textTemplate, textCLetter, textTemplateFooter)

}



function clearHtml() {
    mainForm.reset();
    img.classList.add('hidden', 'd-none');
}


function generatePDF(e) {
    e.preventDefault();
    console.log(dataObj)
    const { name, job, email, phone, company, contact, textLetter } = dataObj;
    if (name === "" || job === "" || email === "" || phone === "" || company === "" || contact === "" || textLetter === "") {
        ui.msmAlert(`You must fill out the entire form to be able to generate the pdf. Don't be lazy..!`);
        return
    }
    var element = document.getElementById('preview');
  const allName= dataObj.name.trim();
    var options = {
        margin: [0, 0, 0, 0], 
        filename: `cover-letter-${name}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        enableLinks: true,
    };

    html2pdf().set(options).from(element).save();
}