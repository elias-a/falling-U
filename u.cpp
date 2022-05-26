#include <fstream>
#include "u.h"

U::U() {}

U::U(double b, double s, double x, double v, double theta, double omega) {
    baseLength_m = b;
    sideHeight_m = s;
    position_m = x;
    velocity_m_s = v;
    angular_position_rad = theta;
    angular_velocity_rad_s = omega;

    centerOfMass_m = computeCenterOfMass(b, s);
}

bool U::isTouchingGround() {
    // Assume angular position is 0.
    double distanceFromGround = position_m - centerOfMass_m;

    if (distanceFromGround <= 0) {
        return true;
    } else {
        return false;
    }
}

void U::writeDimensions() {
    std::ofstream file("data/dimensions.tsv");
    file << centerOfMass_m << "\t";
    file << baseLength_m << "\t";
    file << sideHeight_m << "\n";
    file.close();
}

double U::computeCenterOfMass(double b, double s) {
    return s * s / (2 * s + b);
}
