#pragma once

#include <vector>
#include "u.h"

struct State {
    double y;
    double theta;
};

class Simulation {
    static const double gravity_m_s2;

    public:
        double timeStep_s;
        U uObject;
        int granularity;
        std::vector<State> state;

        Simulation();
        Simulation(double ts, U u, int g);
        void verletStep();
        void propagate();
        void writeState();
};
