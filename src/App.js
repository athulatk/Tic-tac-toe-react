import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import {Card,CardBody,Container,Col,Row} from 'reactstrap';
import Icon from './components/Icon'

const itemArray=new Array(9).fill("empty")
function App() {

  const [isCross,setIsCross]=useState(false);
  const [winMessage,setWinMessage]=useState("");

  const reloadGame = () =>{
    setIsCross(false);
    setWinMessage("");
    itemArray.fill("empty",0,9);
  }
  
  const checkIsWinner = () =>{
    if(itemArray[0]!=="empty" && itemArray[0]===itemArray[1] &&
      itemArray[1]===itemArray[2]){
        setWinMessage(`${itemArray[0]} wins!!`)
      }
    else if(itemArray[3]!=="empty" && itemArray[3]===itemArray[4] &&
      itemArray[4]===itemArray[5]){
      setWinMessage(`${itemArray[3]} wins!!`)
      }
      
    else if(itemArray[6]!=="empty" && itemArray[6]===itemArray[7] &&
      itemArray[7]===itemArray[8]){
      setWinMessage(`${itemArray[6]} wins!!`)
      } 
    else if(itemArray[0]!=="empty" && itemArray[0]===itemArray[3] &&
          itemArray[3]===itemArray[6]){
          setWinMessage(`${itemArray[0]} wins!!`)
          } 
    else if(itemArray[1]!=="empty" && itemArray[1]===itemArray[4] &&
      itemArray[4]===itemArray[7]){
      setWinMessage(`${itemArray[1]} wins!!`)
     } 
    else if(itemArray[2]!=="empty" && itemArray[2]===itemArray[5] &&
      itemArray[5]===itemArray[8]){
      setWinMessage(`${itemArray[2]} wins!!`)
      } 
    else if(itemArray[0]!=="empty" && itemArray[0]===itemArray[4] &&
      itemArray[4]===itemArray[8]){
      setWinMessage(`${itemArray[0]} wins!!`)
      } 
    else if(itemArray[2]!=="empty" && itemArray[2]===itemArray[4] &&
      itemArray[4]===itemArray[6]){
      setWinMessage(`${itemArray[2]} wins!!`)
      }

    }
    const isDraw = () =>{
      if(!itemArray.includes("empty")&&!winMessage){
        setWinMessage("Draw!!")
    }
    }
  const changeItem = itemNumber => {
    if(winMessage){
      if(winMessage==="Draw!!"){
        return toast.warning(winMessage)
      }
      else{
        return toast.success(winMessage)
      }
    }
    if(itemArray[itemNumber]==="empty"){
        itemArray[itemNumber]=isCross ? "cross" : "circle"
        setIsCross(!isCross);
    }
    else{
      return toast("Already Filled",{type:"error"})
    }
    isDraw();
    checkIsWinner();
    
  }
  return (
    <div className="App">
     <Container className="p-5">
       <ToastContainer position="top-right" hideProgressBar={true} autoClose={2000}/>
       <Row>
          <Col md={6} className="offset-md-3">
          <h1 className="text-center">Tic-Tac-Toe</h1>
            {winMessage ? (
              <div className="mb-2 mt-2">
                <h2 className="text-center" style={winMessage==="Draw!!"?{color:"yellow"}:{color:"#ADFF2F"}}>
                  {winMessage}
                </h2>
              </div>
            ) : (
              <h2 className="text-center">
                {isCross ? "Cross Turn" : "Circle Turn" }
              </h2>
            )}
            <div className="grid">
              {itemArray.map((item,index)=>(
                <Card onClick={()=>changeItem(index)}>
                  <CardBody className="box">
                    <Icon name={item}/>
                  </CardBody>
                </Card>
              ))}
            </div>
            {winMessage ? (
              <button className="reload" onClick={reloadGame}>
              Reload Game
              </button>
            ):""}
            
          </Col>
        </Row>
      </Container>
    </div>
  );
            }

export default App;
