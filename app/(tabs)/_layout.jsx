import React from 'react'
import { Tabs } from 'expo-router'
import { MedicineProvider } from '@/components/MedicineContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
 return(
    <MedicineProvider> {/* Wrap everything inside the Provider */}
    <Tabs screenOptions={{
        headerShown: false
    }}>
        <Tabs.Screen name='index'
        options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color,size})=>(
                <FontAwesome name="home" size={size} color={color} />
            )
        }}
        />
        <Tabs.Screen name='AddNew'
         options={{
            tabBarLabel: 'Add New',
            tabBarIcon: ({color,size})=>(
                <FontAwesome name="plus-square" size={size} color={color} />
            )
        }}
        />
        <Tabs.Screen name='Profile'
         options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({color,size})=>(
                <FontAwesome name="user" size={size} color={color} />
            )
        }}
        />
    </Tabs>
    </MedicineProvider>
 )
}