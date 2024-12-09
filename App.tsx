/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type ListRenderItem,
} from 'react-native';
import { RadioButton } from 'react-native-paper';


type Reminder = {
  title: string;
  completed: boolean
}

const defaultReminders: Reminder[] = [
  {
    title: 'Subscribe to notJust.dev',
    completed: false,
  },
  {
    title: 'Build exciting apps',
    completed: false,
  },
  {
    title: 'Be happy',
    completed: true,
  },
];



function App(): JSX.Element {
  const [reminders, setReminders] = useState<Reminder[]>(defaultReminders)
  const [newReminder,setNewReminder]=useState('')

  const sortedReminders=[...reminders]
  sortedReminders.sort((a,b)=>a.completed - b.completed);



  const toggleCompletion=(reminder:Reminder)=>{
   
    let updateReminders=[...reminders]
    let index=reminders.findIndex(r=>r.title==reminder.title)
    updateReminders[index].completed=!updateReminders[index].completed
    setReminders(updateReminders)
  }

  const addReminder=()=>{
    if(newReminder.trim()===''){
      return;
    }
    const updateReminder=[
      ...reminders,
      {title:newReminder.trim(),completed:false}
    ]
    setReminders(updateReminder)
    setNewReminder('')
  }

  

  // const renderItem : ListRenderItem<Reminder> = ({item,index})=>{
  //   return(
  //   <View style={styles.item}>
  //   <RadioButton value={item.title}
  //     status={item.completed?'checked':'unchecked'} 
  //     color='royalblue'
  //   />
  //   <Text style={styles.itemTitle}>{item.title}</Text>
  //   </View>
  // )}

  const renderItem = ({ item, index }: { item: Reminder, index: number }) => {
    return (
      <Pressable style={styles.item} onPress={()=>toggleCompletion(item)}>
        <RadioButton value={item.title}
          status={item.completed ? 'checked' : 'unchecked'}
          color='royalblue'
        />
        <Text style={styles.itemTitle}>{item.title}</Text>
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Reminder</Text>
        <Text style={styles.title}>{reminders.length}</Text>
      </View>
      <FlatList data={sortedReminders} renderItem={renderItem} />
      <TextInput 
          placeholder='Add New Reminder'
          value={newReminder}
          onChangeText={setNewReminder}
          style={styles.input}
          placeholderTextColor={"white"}
          onSubmitEditing={addReminder}
          />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#211D2D",
    flex: 1
  },
  titleContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginVertical:15
  },
  title:{
    color:"royalblue",
    fontSize:32,
    fontWeight:"bold"
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#454547',
    paddingVertical: 5
  },
  itemTitle: {
    color: "white"
  },
  input:{
    color:"white",
    padding:10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#454547',
    borderRadius:5
  }
});

export default App;

