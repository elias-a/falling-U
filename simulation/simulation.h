#pragma once

#include <vector>
#include "u.h"

struct State {
    double y;
    double theta;
};

class Simulation {
    public:
        Simulation();
        Simulation(double ts, U u, int g);
        void propagate();
        void writeState();
        void writeInitialConditions();
    private:
        static const double gravity_m_s2;
        double timeStep_s;
        U uObject;
        int granularity;
        State previousState;
        std::vector<State> state;
        std::vector<State> translations;

        void verletStep();
        void storeData();
};
