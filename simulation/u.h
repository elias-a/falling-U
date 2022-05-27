#pragma once

class U {
    public:
        double position_m;
        double velocity_m_s;
        double angular_position_rad;
        double angular_velocity_rad_s;

        U();
        U(double b, double s, double x, double v, double theta, double omega);
        bool isTouchingGround();
        void writeDimensions();
    private:
        double centerOfMass_m;
        double baseLength_m;
        double sideHeight_m;

        double computeDistanceFromGround();
        double computeCenterOfMass(double b, double s);
};
