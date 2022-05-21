#pragma once

#include "u.h"

class Simulation {
    static const double gravity_m_s2;

    public:
        double timeStep_s;
        U uObject;

        Simulation();
        Simulation(double ts, U u);
        void verletStep();
        void propagate();
};
