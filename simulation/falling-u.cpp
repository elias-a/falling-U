#include <fstream>
#include "u.h"
#include "simulation.h"

int main() {
    // Dimensions of the U
    double baseLength_m;
    double sideHeight_m;

    // Initial conditions
    double position_m;
    double velocity_m_s;
    double angular_position_rad;
    double angular_velocity_rad_s;

    // Simulation variables
    double timeStep_s;
    int granularity;
    double surfaceFactor;

    std::ifstream file("parameters.txt");
    file >> baseLength_m;
    file >> sideHeight_m;
    file >> position_m;
    file >> velocity_m_s;
    file >> angular_position_rad;
    file >> angular_velocity_rad_s;
    file >> timeStep_s;
    file >> granularity;
    file >> surfaceFactor;
    file.close();

    U u(baseLength_m, sideHeight_m, position_m, velocity_m_s, angular_position_rad, angular_velocity_rad_s);
    u.writeDimensions();

    Simulation sim(timeStep_s, u, granularity, surfaceFactor);
    sim.writeInitialConditions();
    sim.propagate();
    sim.writeState();

    return 0;
}
