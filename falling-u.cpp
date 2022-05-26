#include "u.h"
#include "simulation.h"

int main() {
    // Dimensions of the U
    double baseLength_m = 0.08;
    double sideHeight_m = 0.11;

    // Initial conditions
    double position_m = 1.;
    double velocity_m_s = 0.;
    double angular_position_rad = 0.;
    double angular_velocity_rad_s = 0.;

    // Simulation variables
    double timeStep_s = 1e-6;
    int granularity = 1000;

    U u(baseLength_m, sideHeight_m, position_m, velocity_m_s, angular_position_rad, angular_velocity_rad_s);
    u.writeDimensions();

    Simulation sim(timeStep_s, u, granularity);
    sim.writeInitialConditions();
    sim.propagate();
    sim.writeState();

    return 0;
}
