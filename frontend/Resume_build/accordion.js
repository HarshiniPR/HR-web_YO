let accordions=document.querySelectorAll('.accordion-wrapper .accordion');
accordions.forEach((acco)=>{
    acco.onclick = () =>{
        accordions.forEach((subcontent) => {
            subcontent.classList.remove("active");
        });
        acco.classList.add("active");
        
    };
        
});
