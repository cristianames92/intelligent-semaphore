package com.thegrid.behavior.platform

import com.thegrid.behavior.model.EntryNode
import com.thegrid.behavior.services.MapStateMemory
import com.thegrid.behavior.model.Map
import com.thegrid.behavior.platform.Orchestrator
import com.thegrid.behavior.platform.TimeDispatcher
import com.thegrid.communication.model.MapState
import kotlin.properties.Delegates

class Simulation(map : Map) {
    companion object {
        var SharedInstance : Simulation by Delegates.notNull<Simulation>()
    }

    val memory: MapStateMemory
    val map: Map
    val orquestador: Orchestrator
    val AG: Object = Object()
    val dispatcher: TimeDispatcher

    init {
        SharedInstance = this
        memory = MapStateMemory(map)
        dispatcher = TimeDispatcher()
        this.map = map

        val nodosEntrada = map.nodes.filter {
            it is EntryNode
        }.forEach {
            dispatcher.dispatchOn()
        }

        orquestador = Orchestrator(Runnable {
            while (true) {
                println("asd")
                Thread.sleep(5000)
            }
        })
    }

    fun simulate() {
        //TBD
    }

    fun getStatus(): MapState {
        return memory.getStatus()
    }
}