#include <fstream>
#include "simulation.h"

const double Simulation::gravity_m_s2 = -9.81;

Simulation::Simulation() {}

Simulation::Simulation(double ts, U u, int g) {
    timeStep_s = ts;
    uObject = u;
    granularity = g;
}

void Simulation::verletStep() {
    uObject.position_m += timeStep_s * uObject.velocity_m_s +
        0.5 * timeStep_s * timeStep_s * gravity_m_s2;
    uObject.velocity_m_s += timeStep_s * gravity_m_s2;
}

void Simulation::propagate() {
    // Loop until the U hits the ground.
    int counter = 0;
    while (!uObject.isTouchingGround()) {
        verletStep();

        if (counter++ % granularity == 0) {
            State currentState = {
                uObject.position_m,
                uObject.angular_position_rad,
            };
            state.push_back(currentState);
        }
    }
}

void Simulation::writeState() {
    std::ofstream file("data/out.tsv");
    for (const auto &el : state) {
        file << el.y << "\t" << el.theta << "\n";
    }
    file.close();
}
