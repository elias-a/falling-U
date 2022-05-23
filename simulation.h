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
        State previousState;
        std::vector<State> state;
        std::vector<State> translations;

        Simulation();
        Simulation(double ts, U u, int g);
        void verletStep();
        void propagate();
        void writeState();
        void writeInitialConditions();
};
