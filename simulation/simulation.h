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
        Simulation(double ts, U u, int g, double f);
        void propagate();
        void writeState();
        void writeInitialConditions();
    private:
        static const double gravity_m_s2;
        double timeStep_s;
        U uObject;
        int granularity;
        State previousState;
        double surfaceFactor;
        std::vector<State> state;
        std::vector<State> translations;

        void verletStep();
        void applyImpulse();
        void storeData();
};
