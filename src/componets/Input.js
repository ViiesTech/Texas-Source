import { TextInput } from "react-native"

export const Input = ({placeHolder,}) => {
  return(
    <TextInput placeholderTextColor={'#949494'} placeholder={placeHolder} style={{width:'100%',height:60,borderRadius:10,borderWidth:1,borderColor:'#FFFFFF',padding:20,color:'white'}}/>
  )
}