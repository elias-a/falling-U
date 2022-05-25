#include <fstream>
#include "simulation.h"

const double Simulation::gravity_m_s2 = -9.81;

Simulation::Simulation() {}

Simulation::Simulation(double ts, U u, int g) {
    timeStep_s = ts;
    uObject = u;
    granularity = g;
    previousState = {
        u.position_m,
        u.angular_position_rad,
    };
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
            storeData();
        }
    }

    storeData();
}

void Simulation::writeState() {
    std::ofstream outFile("data/out.tsv");
    for (const auto &el : state) {
        outFile << el.y << "\t" << el.theta << "\n";
    }
    outFile.close();

    std::ofstream translationsFile("data/translations.tsv");
    for (const auto &el : translations) {
        translationsFile << el.y << "\t" << el.theta << "\n";
    }
    translationsFile.close();
}

void Simulation::writeInitialConditions() {
    std::ofstream file("data/initial.tsv");
    file << uObject.position_m << "\t";
    file << uObject.angular_position_rad << "\n";
    file.close();
}

void Simulation::storeData() {
    State currentState = {
        uObject.position_m,
        uObject.angular_position_rad,
    };
    state.push_back(currentState);

    State diff = {
        previousState.y - uObject.position_m,
        previousState.theta - uObject.angular_position_rad,
    };
    translations.push_back(diff);

    previousState = {
        uObject.position_m,
        uObject.angular_position_rad,
    };
}
