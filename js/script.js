// فكرة visit إني ببعتلها href ل url اللي داخل


var bookName = document.getElementById('Name');
var bookURL = document.getElementById('URL');
var searchValue = document.getElementById('searchValue');
var addBtn = document.getElementById('addProduct');
var URLAlert= document.getElementById('URLAlert');
var currentIndex= 0;
// start localStorage
// هعمل شرط لو allproduct فاضي اعرضلي arr بتاعي فاضي لو في داتا اعرضلي داتا اللي جواه 
if(localStorage.getItem('allproduct')== null){
    // productContainer arr بخزن جواه كل product الجديدة من خلال push عشان ميعملوش override علي بعض 
     var bookContainer=[]
   }else{
     // JSON.parse بستخدمها عشان ارجع string ل json 
     var bookContainer = JSON.parse(localStorage.getItem('allproduct'))
   
     display()
   }
   // end localStorage


   // start  button update
addBtn.onclick=function(){
    if(validateBook() == true && bookName.value !='' && bookURL.value != ''  ){
     
      if(addBtn.innerHTML == 'AddProduct'){
        createBook()
      }else{
        updateBook()
      }
    
      localStorage.setItem('allproduct',JSON.stringify(bookContainer))
      clearbook()
      display()
    }else{
      alert('not Valid')
    }
  
  }
  // end button update

  // start getProductInfo
// ببعتلها index وبساوي value اللي جواها ب value اللي موجودة ف index ده 
function getProductInfo(index){ 
    currentIndex =index;
    bookName.value= bookContainer[index].pname;
    bookURL.value=bookContainer[index].URL;
   
    addBtn.innerHTML ='updateProduct'
    }
    // end getProductInfo


// start update
function updateBook(){
    // اول حاجة هعرف القيم من جديد 
    var product ={
        pname:bookName.value,
        URL :  bookURL.value,
    }
    // هنا عشان يعرض اللي موجود بعد  ما اتعمل عليه update
  bookContainer[currentIndex] = product;
  addBtn.innerHTML ='AddProduct';
 
  }
    // end update



// start create
function createBook(){

    var product ={
      pname:bookName.value,
      URL :  bookURL.value,
  
    }
    bookContainer.push(product)
    console.log(bookContainer)
    display()
    clearbook()
    }
    // end create


    // start clear
function clearbook(){
    bookName.value='';
    bookURL.value='';

  }
  // end clear 


  //  start display
function display(){
    // 1) عملت متغير خزنت فيه الداتا اللي هتجيلي
   
    var trs='';
     // 2) هعمل loop  علي  productContainer اللي شايل داتا بتاعتي 
    for(var i =0 ; i<bookContainer.length;i++){
      // 3) هضيف جواه اي داتا جديدة تجيلي في table اللي عامله 
      trs +=`<tr>
           
 
      <td>${bookContainer[i].pname}</td>
      <td>
      <a href="${bookContainer[i].URL}"> <button  class="btn btn-primary" " >visit</button></a> 

      </td>

      <td>
        <button class="btn btn-warning" onclick="getProductInfo(${i})" >update</button>
      </td>
      <td>
   
        <button class="btn btn-danger" onclick="delet(${i})">delete</button>
      </td>
    </tr>`
    // 1) بحط on click في button بتاعة delete 
    }
    // 4) هغير table في html هخليه يعرض مكانه متغير بتاعي اللي مخزن جواه داتا trs
    document.getElementById('tableBody').innerHTML=trs
  }
  //  end display
  // start delete
// 
function  delet(index){
    console.log(index)
    // 2) بستخدم splice يمسح من bookContainer علي حسب index ويحذف 1 بس 
    bookContainer.splice(index,1)
    console.log(bookContainer)
    // JSON.stringify عشان يحول json الي string وبعمل الخطوة دي عشان لما اعمل delete يسمع معايا ف local storage
    localStorage.setItem('allproduct',JSON.stringify(bookContainer))
    // 3) بعمل call تاني ل display عشان يعرض اخر تحديث معايا  
    display()
    }
    // end delete

    // start search
function searchProdct(){
    // 1) هاخد نفس خطوات اللي ف display وهحطها عندي 
  
  var trs='';
  for(var i =0 ; i<bookContainer.length;i++){
    // 2) هعمل شرط في productContainer لو موجود value اللي في input search اعرض معايا trs  وبستخدم include عشان يبحث
    // toLowerCase عشان يحول اللي داتا كله ل smail سواء المستخدم دخله باي طريقة يظهر معايا 
    if(bookContainer[i].pname.toLowerCase().includes(searchValue.value.toLowerCase()) )
    {
        trs +=`<tr>
           
 
        <td>${bookContainer[i].pname}</td>
        <td>
        <a href="${bookContainer[i].URL}"> <button  class="btn btn-primary" " >visit</button></a> 
        </td>
  
        <td>
          <button class="btn btn-warning"  onclick="getProductInfo(${i})" >update</button>
        </td>
        <td>
     
          <button class="btn btn-danger" onclick="delet(${i})">delete</button>
        </td>
      </tr>`
    }
  
  }
  document.getElementById('tableBody').innerHTML=trs
  
  }
  // end search 




// start validate
  
function validateBook(){
    var pname =bookName.value;
   var URL = bookURL.value;
    
     var pnameRegex = /^[A-Z a-z]/;
     var URLRegex =   /^(www)|^(http)/
   

   
     if( pnameRegex.test(pname) == true && URLRegex.test(URL) == true   ){
      URLAlert.classList.add('d-none');
     bookURL.classList.add('is-valid');
    bookURL.classList.remove('is-invalid');
        return true;
     }else{
      URLAlert.innerHTML="start with (www or https)"
      URLAlert.classList.remove('d-none');
      bookURL.classList.remove('is-valid');
     bookURL.classList.add('is-invalid');
       return false;
     }
   }
//    end validate