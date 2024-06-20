import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './HomeStyle';

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    };

    loadTasks();
  }, []);

  const addTask = async () => {
    const task: Task = {
      id: Math.random().toString(),
      title: newTask,
      completed: false,
    };
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setNewTask('');
  };

  const toggleTaskCompletion = async (taskId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Task List</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Text style={item.completed ? styles.completedTask : styles.taskText}>{item.title}</Text>
            <Button title={item.completed ? "Undo" : "Complete"} onPress={() => toggleTaskCompletion(item.id)} />
          </View>
        )}
      />
      <TextInput
        placeholder="New Task"
        value={newTask}
        onChangeText={setNewTask}
        style={styles.input}
      />
      <Button title="Add Task" onPress={addTask} />
      <Button title="Go to Task Detail" onPress={() => navigation.navigate('TaskDetail')} />
    </View>
  );
};

export default HomeScreen;
