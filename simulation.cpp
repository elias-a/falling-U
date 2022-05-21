#include "simulation.h"

const double Simulation::gravity_m_s2 = -9.81;

Simulation::Simulation() {}

Simulation::Simulation(double ts, U u) {
    timeStep_s = ts;
    uObject = u;
}

void Simulation::verletStep() {
    uObject.position_m += timeStep_s * uObject.velocity_m_s +
        0.5 * timeStep_s * timeStep_s * gravity_m_s2;
    uObject.velocity_m_s += timeStep_s * gravity_m_s2;
}

void Simulation::propagate() {
    // Loop until the U hits the ground.
    while (!uObject.isTouchingGround()) {
        verletStep();
    }
}
